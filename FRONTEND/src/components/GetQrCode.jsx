import QrCode from "qrcode";
import { useEffect, useState } from "react";
import downloadIcon from "../assets/download.png";

// TODO: add QR zoom feature

export const GetQrCode = ({ short_url }) => {

    const [qr, setQr] = useState("");


    const downloadQr = () => {
        const link = document.createElement("a");

        link.href = qr;
        link.download = "qr-code.png";

        link.click();
    };


    useEffect(() => {
        const generateQrFn = async () => {
            try {
                const qrCode = await QrCode.toDataURL(short_url);
                setQr(qrCode);
            } catch (error) {
                console.log(error);
            }
        }
        generateQrFn();
    }, [short_url])

    return (
        <div className="w-full rounded-xl bg-slate-50 p-5  sm:p-6">

            {/* QR Code */}
            {qr && (
                <div className="flex justify-center">
                    <div className="rounded-xl border border-slate-400 bg-white p-3 shadow-sm">
                        <img
                            src={qr}
                            alt="QR Code"
                            className="h-48 w-48 object-contain sm:h-52 sm:w-52"
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="mt-5">

                <h3 className="text-lg font-semibold text-slate-800">
                    Scan QR Code
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Scan this code to open the shortened link
                </p>

                <div className="my-5 h-px bg-slate-200" />

                {/* Actions */}
                <div className="flex flex-col gap-3">

                    <button
                        onClick={downloadQr}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-yellow-700 active:scale-[0.98] sm:w-auto"
                    >
                        <img
                            src={downloadIcon}
                            alt=""
                            className="h-4 w-4 brightness-0 invert"
                        />
                        Download
                    </button>

                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-yellow-400 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-yellow-500 active:scale-[0.98] sm:w-auto"
                    >
                        <span className="text-lg">⌕</span>
                        Zoom
                    </button>

                </div>

            </div>

        </div>
    )

}