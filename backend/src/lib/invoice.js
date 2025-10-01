// lib/invoice.js
import PDFDocument from "pdfkit";
import cloudinary from "../lib/cloudinary.js";

export const generateInvoice = async (patient, bill) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);

        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: "hospital-invoices",
              format: "pdf",
            },
            (error, result) => {
              if (error) return reject(error);

              const viewUrl = result.secure_url;
              resolve(viewUrl); // return viewable invoice URL
            }
          )
          .end(pdfBuffer);
      });

      // Invoice contents
      doc.fontSize(20).text("Hospital Invoice", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Patient Name: ${patient.name}`);
      doc.text(`Age: ${patient.age}`);
      doc.text(`Gender: ${patient.gender}`);
      doc.text(`Contact: ${patient.contactNo}`);
      doc.text(`Address: ${patient.address}`);

      doc.text(`Consulting Doctor: ${patient.consultingDoctor?.name || "N/A"}`);

      doc.moveDown();
      doc.text(`Invoice ID: ${bill._id}`);
      doc.text(`Total Amount: ₹${bill.totalAmount}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
