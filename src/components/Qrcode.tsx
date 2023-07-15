import QRCode from "qrcode.react";

interface QRCodeGeneratorProps {
  shortUrl: string;
}

const QRCodeGenerator = ({ shortUrl }: QRCodeGeneratorProps) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode-canvas") as HTMLCanvasElement;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="qrcode">
      <QRCode id="qrcode-canvas" value={shortUrl} size={180} />
      <button type="button" onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default QRCodeGenerator; 





