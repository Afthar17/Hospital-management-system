// lib/labreport.js
import PDFDocument from "pdfkit";
import cloudinary from "../lib/cloudinary.js";

export const generateLabReport = async (patient, pressure, temperature) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      // collect pdf chunks
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", async () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);

          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "raw",
                folder: "hospital-bills",
                format: "pdf",
              },
              (error, result) => {
                if (error) return reject(error);

                // Viewable URL (opens in browser)
                const viewUrl = result.secure_url;

                // Optional: direct download URL
                const publicId = result.public_id || "";
                const encodedPublicId = publicId
                  .split("/")
                  .map((seg) => encodeURIComponent(seg))
                  .join("/");

                const cloudName =
                  (cloudinary.config && cloudinary.config().cloud_name) ||
                  process.env.CLOUDINARY_CLOUD_NAME;

                const format = result.format || "pdf";
                const version = result.version ? `v${result.version}` : "";

                const downloadUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/fl_attachment/${version}/${encodedPublicId}.${format}`;

                resolve({ viewUrl, downloadUrl, result });
              }
            )
            .end(pdfBuffer);
        } catch (err) {
          reject(err);
        }
      });

      // PDF contents
      doc.fontSize(18).text("Lab Report", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Patient: ${patient.name}`);
      doc.text(`Age: ${patient.age}`);
      doc.text(`Gender: ${patient.gender}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();
      patient.prescriptions?.forEach((item, idx) =>
        doc.text(`Prescription ${idx + 1}: ${item}`)
      );
      doc.text(`Pressure: ${pressure}`);
      doc.text(`Temperature: ${temperature}`);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
