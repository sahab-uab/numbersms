const MapSection = () => {
  return (
    <div className="bg-[#F5F5FF] py-20">
      <div className="wrapper grid grid-cols-2 items-center  justify-start">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-4xl font-bold leading-normal">
              <span> Planning a visit?</span> <br />
              <span>Here's how you can</span>{" "}
              <span className="text-[#7E48E7]">find us</span>.
            </h1>

            <p className="text-[18px] leading-normal text-gray-700 font-semibold">
              Whether you're attending a scheduled meeting, workshop, or just
              dropping by, use the following directions to reach our office.
            </p>
          </div>
          {/* address */}
          <div>
            <h4 className="text-2xl font-medium">Address:</h4>

            <span className="text-gray-700 font-medium">
              15 Washington Square <br /> New York, NY 10075, USA
            </span>
          </div>
          {/* Working hours: */}
          <div>
            <h4 className="text-2xl font-medium">Working hours:</h4>
            <span className="text-gray-700 font-medium">
              Monday - Friday: 8AM - 5PM
            </span>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.081185401779!2d90.3481904972318!3d23.811485466430458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c102e2ece5bb%3A0x446e9dc895326a70!2sBangladesh%20National%20Zoo!5e0!3m2!1sen!2sbd!4v1739019711398!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
