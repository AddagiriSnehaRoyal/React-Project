const AppError = require("../utils/AppError");

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw new AppError(
        "Student not found in DB",
        404,
        "Student not found"
      );
    }

    res.json(student);
  } catch (err) {
    next(err); //  forwarded to global handler
  }
});
