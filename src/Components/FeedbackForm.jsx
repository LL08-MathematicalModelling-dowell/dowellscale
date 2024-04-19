
function FeedbackForm() {
  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold mb-4">Write feedback to us</h2>
      <textarea
        className="w-full p-3 border rounded-md resize-none focus:border-blue-500 focus:outline-none h-32"
        placeholder="Write here"
      ></textarea>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out">
        Submit
      </button>
    </>
  );
}

export default FeedbackForm;
