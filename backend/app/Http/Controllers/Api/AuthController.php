<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\Mailer;
use App\Models\Otp;
use App\Models\PasswordOtp;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    // register
    public function register(Request $request)
    {
        // validation
        $request->validate([
            'name' => 'required|string|min:1',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:50|confirmed',
        ]);

        try {
            // check this email already register or not
            $existinguser = User::where('email', $request->email)->exists();
            if ($existinguser) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email already registered',
                    'data' => []
                ]);
            }

            // save data after validation
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            // login after register user
            $token = auth()->attempt([
                'email' => $request->email,
                'password' => $request->password
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User logged in',
                'data' => auth()->user(),
                'token' => $token,
                'expires_in' => auth()->factory()->getTTL() * 60
            ]);
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // login
    public function login(Request $request)
    {
        // validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|max:50',
        ]);

        try {
            // auth Facade
            $token = auth()->attempt([
                'email' => $request->email,
                'password' => $request->password
            ]);

            if (!$token) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid login details',
                    'data' => []
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'User logged in',
                'data' => auth()->user(),
                'token' => $token,
                'expires_in' => auth()->factory()->getTTL() * 60
            ]);
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // profile
    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'user profile data',
            'data' => $userData
        ]);
    }

    // update prifle
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:1',
        ]);

        // update profile
        try {
            $user = auth()->user();
            $user->name = $request->name;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'User profile updated  success',
                'data' => auth()->user()
            ]);
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // refresh token
    public function refreshToken()
    {
        $token = auth()->refresh();

        return response()->json([
            'status' => true,
            'message' => 'New token making success',
            'data' => [],
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    // logout
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'status' => true,
            'message' => 'User logged out',
            'data' => []
        ]);
    }

    // verify email
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'otp' => 'required|min:6'
        ]);

        try {
            $otp = Otp::where('otp', $request->otp)
                ->where('user_id', auth()->user()->id)
                ->first();

            if ($otp) {
                if ($otp->created_at < Carbon::now()->subMinutes(5)) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Verification code timeout',
                        'data' => []
                    ]);
                } else {
                    $user = auth()->user();
                    $user->email_verify = true;
                    $user->save();

                    $otp->delete();
                    return response()->json([
                        'status' => true,
                        'message' => 'Email verification success',
                        'data' => []
                    ]);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid OTP code',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'otp' => 'required|min:6',
            'password' => 'required|min:6|max:50|confirmed'
        ]);

        try {
            $otp = PasswordOtp::where('otp', $request->otp)->first();

            if ($otp) {
                if ($otp->created_at < Carbon::now()->subMinutes(5)) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Verification code timeout',
                        'data' => []
                    ]);
                } else {
                    $user = User::where('email', $otp->user_id)->first();
                    $user->password = bcrypt($request->password);
                    $user->save();

                    $otp->delete();
                    return response()->json([
                        'status' => true,
                        'message' => 'Password change success',
                        'data' => []
                    ]);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid OTP code',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // chanage password when user loggden
    public function chanagePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|min:6|max:50',
            'password' => 'required|min:6|max:50|confirmed'
        ]);

        try {
            if (!Hash::check($request->old_password, auth()->user()->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Password does not match.',
                    'data' => []
                ]);
            }

            $user = auth()->user();
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Password change success',
                'data' => []
            ]);
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // forget password send mail
    public function forgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $verificationCode = rand(100000, 999999);
            $user = User::where('email', $request->email)->first();

            if ($user) {
                PasswordOtp::create([
                    'user_id' => $request->email,
                    'otp' => $verificationCode
                ]);

                $sendMail = Mail::to($user->email)->send(new Mailer('Reset password', 'Your OTP code is: ' . $verificationCode));

                if ($sendMail) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Verification email has been sent successfully',
                        'data' => []
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Somthing else wrong try again!',
                        'data' => []
                    ]);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid email',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }

    // send otp
    public function sendotp()
    {
        try {
            $verificationCode = rand(100000, 999999);

            Otp::create([
                'user_id' => auth()->user()->id,
                'otp' => $verificationCode
            ]);

            $sendMail = Mail::to(auth()->user()->email)->send(new Mailer('Email Verification', 'Your verification code is: ' . $verificationCode));

            if ($sendMail) {
                return response()->json([
                    'status' => true,
                    'message' => 'Verification email has been sent successfully',
                    'data' => []
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Somthing else wrong try again!',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }
}
