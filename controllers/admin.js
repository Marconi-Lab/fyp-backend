exports.sampleAdmin = async (req, res) => {
  try {
    console.log("Sample Admin route");
    res.status(200).send({ msg: "Sample Admin route..." });
  } catch (error) {
    res.status(400).send({ msg: "Sample admin route not working", error });
  }
};
