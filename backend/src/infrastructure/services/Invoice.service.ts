import PDFDocument from "pdfkit";
import type { IInvoiceService } from "../../core/ports/invoice.service.interface.js";
import type { OrderItemView, OrderSummaryView } from "../../modules/order/types/order.type.js";
import { formatCurrency } from "../../core/utils/format.rupees.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class InvoiceService implements IInvoiceService {

    async generateInvoice(order: OrderSummaryView): Promise<Buffer> {

        const doc = new PDFDocument({ margin: 50 });
        const labelX = 350;
        const valueX = 470;

        // Register fonts (production-safe path)
        doc.registerFont(
            "Roboto",
            path.resolve(__dirname, "../../assets/fonts/Roboto-Regular.ttf")
        );

        doc.registerFont(
            "Roboto-Bold",
            path.resolve(__dirname, "../../assets/fonts/Roboto-Bold.ttf")
        );

        doc.font("Roboto");

        const buffers: Uint8Array[] = [];
        doc.on("data", (chunk) => buffers.push(chunk));

        return new Promise((resolve, reject) => {

            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.on("error", reject);

            const accent = "#d4af37";
            const pageWidth = doc.page.width - 100;

            /* ---------------- HEADER ---------------- */

            doc
                .font("Roboto-Bold")
                .fontSize(26)
                .fillColor(accent)
                .text("NIVAH");

            doc
                .font("Roboto-Bold")
                .fontSize(18)
                .fillColor("black")
                .text("INVOICE", { align: "right" });

            doc.moveDown(1.5);

            /* ---------------- ORDER META ---------------- */

            doc
                .font("Roboto")
                .fontSize(11)
                .fillColor("black")
                .text(`Invoice No: ${order.orderNumber}`)
                .text(`Order ID: ${order.id}`)
                .text(`Date: ${new Date(order.createdAt).toDateString()}`);

            doc.moveDown(1.5);

            /* ---------------- BILLING DETAILS ---------------- */

            doc
                .font("Roboto-Bold")
                .fontSize(14)
                .fillColor(accent)
                .text("Billing Details");

            doc.moveDown(0.5);

            const user = order.userSnapshot;

            doc
                .font("Roboto")
                .fontSize(11)
                .fillColor("black")
                .text(user.name)
                .text(user.email)
                .text(user.phone)
                .text(user.addressLine1)
                .text(user.addressLine2 || "")
                .text(`${user.city}, ${user.state} - ${user.pincode}`);

            doc.moveDown(2);

            /* ---------------- TABLE HEADER ---------------- */

            let position = doc.y;

            const itemX = 50;
            const sizeX = 260;
            const qtyX = 320;
            const priceX = 380;
            const totalX = 450;

            doc
                .rect(50, position - 5, pageWidth, 20)
                .fill(accent);

            doc
                .font("Roboto-Bold")
                .fillColor("white")
                .fontSize(11)
                .text("Product", itemX, position)
                .text("Size", sizeX, position)
                .text("Qty", qtyX, position)
                .text("Price", priceX, position)
                .text("Total", totalX, position);

            position += 25;

            /* ---------------- TABLE BODY ---------------- */

            doc.font("Roboto").fillColor("black");

            for (const item of order.items) {

                // Auto page break
                if (position > doc.page.height - 120) {
                    doc.addPage();
                    position = 50;
                }

                const total = item.price * item.quantity;

                const productHeight = doc.heightOfString(
                    item.name,
                    { width: 200 }
                );

                doc
                    .fontSize(10)
                    .text(item.name, itemX, position, { width: 200 })
                    .text(item.size, sizeX, position)
                    .text(item.quantity.toString(), qtyX, position)
                    .text(formatCurrency(item.price), priceX, position)
                    .text(formatCurrency(total), totalX, position);

                position += productHeight + 10;
            }

            /* ---------------- TOTALS SECTION ---------------- */

            position += 20;

            doc
                .moveTo(300, position)
                .lineTo(doc.page.width - 50, position)
                .stroke();

            position += 10;

            doc
                .font("Roboto")
                .fontSize(11)
                .text("Subtotal:", labelX, position)
                .text(formatCurrency(order.subtotal), valueX, position);

            position += 20;

            doc
                .text("Shipping:", labelX, position)
                .text(
                    order.shippingFee === 0
                        ? "Free"
                        : formatCurrency(order.shippingFee),
                    valueX,
                    position
                );

            position += 25;

            doc
                .font("Roboto-Bold")
                .fontSize(13)
                .fillColor(accent)
                .text("Grand Total:", labelX, position)
                .text(formatCurrency(order.totalAmount), valueX, position);

            /* ---------------- FOOTER ---------------- */


            const footerY = doc.page.height - 80; // fixed bottom margin

            doc
                .font("Roboto")
                .fontSize(11)
                .fillColor("gray")
                .text(
                    "Thank you for shopping with NIVAH.",
                    50,
                    footerY,
                    { align: "center", width: doc.page.width - 100 }
                );

            doc
                .fontSize(9)
                .fillColor("#888888")
                .text(
                    "This is a system-generated invoice. No signature required.",
                    50,
                    footerY + 18,
                    { align: "center", width: doc.page.width - 100 }
                );

            doc
                .fontSize(9)
                .fillColor("#888888")
                .text(
                    "End of Document",
                    50,
                    footerY + 34,
                    { align: "center", width: doc.page.width - 100 }
                );

            doc.end();
        });
    }
}