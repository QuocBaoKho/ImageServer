const sql = require("mssql");
const dbconfig = require("../config/dbconfig");
exports.insertImage = async (req, res) => {
  const imageName = req.headers["image-name"];
  const imageBuffer = req.file.buffer;
  if (!req.body || !imageName) {
    return res.status(400).send("No image data or image name provided.");
  }
  try {
    const pool = await sql.connect(dbconfig);

    const result = await pool
      .request()
      .input("imageName", sql.NVarChar, imageName)
      .input("imageData", sql.VarBinary(sql.MAX), imageBuffer)
      .query(
        "INSERT INTO Images (imageName, imageData) VALUES (@imageName, @imageData)"
      );
    console.log("Image inserted successfully:", result);
    res.status(200).send("Image uploaded and inserted successfully.");
  } catch (err) {
    console.error("Error inserting image:", err);
    res.status(500).send("Failed to insert image.");
  }
};
exports.getAllImages = async (req, res) => {
  try {
    const keyword = req.query.q;

    const pool = await sql.connect(dbconfig);
    const baseQuery = "SELECT * from Images";
    const result = await pool
      .request()
      .query(
        keyword ? `${baseQuery} where ImageName LIKE %${keyword}%` : baseQuery
      );
    if (result.recordset.length > 0) {
      const pics = result.recordset.map((row) => ({
        id: row.ID,
        imageName: row.ImageName,
        imageData: row.ImageData.toString("base64"),
        uploadDate: row.UploadDate,
      }));
      res.json(pics);
    } else {
      res.status(404).send("Images not found");
    }
  } catch (err) {
    console.error("Error retrieving images:", err);
    res.status(500).send("Failed to retrieve images.");
  }
};
exports.get_image_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const pool = await sql.connect(dbconfig);
    const query = `SELECT * from Images where ID = ${id}`;
    const result = await pool.request().query(query);
    if (result.recordset.length > 0) {
      const picResult = result.recordset[0];
      const pic = {
        id: picResult.ID,
        imageName: picResult.ImageName,
        imageData: picResult.ImageData.toString("base64"),
        uploadDate: picResult.UploadDate,
      };
      res.json(pic);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (err) {
    console.error("Error retrieving image:", err);
    res.status(500).send("Failed to retrieve image.");
  }
};
