import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { checkSlugExistsApi, createShortUrlApi, getShortUrlsOfUserApi } from "../apis/shortUrl.api.js";
import { Activity } from "react";
import { GetQrCode } from "./GetQrCode.jsx";
import { useSelector } from "react-redux";

const UrlForm = ({ customUrlVisibilityMode, expiryDateVisibilityMode }) => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [expiryDate, setExpiryDate] = useState("");
    const [slug, setSlug] = useState("");
    const [slugExists, setSlugExists] = useState(false);
    const [error, setError] = useState("");
    const [qrVisibility, setQrVisibility] = useState(false);
    const userAuthStatus = useSelector((state) => state.user.authStatus);
    const userInfo = useSelector((state) => state.user.userData)

    const getShortUrl = async (url, slug, expiresAt) => {

        try {

            if (!url) {
                setError("URL field empty!")
            }
            setLoading(true);



            const userId = userInfo.user._id;

            console.log(await getShortUrlsOfUserApi(userId))

            const data = await createShortUrlApi(url, userId || "", slug, expiresAt)

            if (!data.success) {
                setError(data.data);
                console.log("UrlForm.jsx :: createShortUrlApi API not working!!!");
            }

            setShortUrl(data.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }

    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        toast("Copied!", {
            autoClose: 500
        });
    }

    return (
        <div className="">
            <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-[50%]">
                    <div className="w-full mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="url"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Enter URL
                            </label>

                            <input
                                id="url"
                                type="text"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value)
                                    console.log(url) // idhar he ek console :(
                                }}
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                            />

                            {
                                <div className="text-red-500">{error}</div>
                            }
                        </div>

                        <Activity mode={customUrlVisibilityMode}>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="custom-url"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Enter your custom URL name
                                </label>

                                <input
                                    id="custom-url"
                                    type="text"
                                    placeholder="yourname"
                                    value={slug}
                                    onChange={async (e) => {
                                        const newSlug = e.target.value;
                                        setSlug(() => newSlug);
                                        const exists = await checkSlugExistsApi(newSlug);
                                        setSlugExists(exists);
                                    }}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                />
                                {
                                    slugExists && <p className="text-red-500">Your custom URL name is taken!</p>
                                }
                            </div>
                        </Activity>

                        <Activity mode={expiryDateVisibilityMode}>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="expDate"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Set Expiry Date
                                </label>

                                <input
                                    id="expDate"
                                    type="date"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                />
                            </div>
                        </Activity>

                        <button
                            disabled={loading}
                            className="rounded-lg bg-blue-600 py-3 font-semibold hover:cursor-pointer text-white transition hover:bg-blue-700 active:scale-[0.98]"
                            onClick={() => {
                                console.log("slug exists,", slugExists) // idhar ek hai console
                                if (!loading && !slugExists) getShortUrl(url, slug, expiryDate)
                            }}
                        >
                            {loading ? "Fetching Short URL..." : "Get Short URL"}
                        </button>
                    </div>


                </div>
                {shortUrl && (
                    <div className="max-h-fit md:w-[50%] items-center mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <div>
                            <Activity mode={qrVisibility ? "visible" : "hidden"}>
                                <div>
                                    <GetQrCode short_url={shortUrl} />
                                </div>
                            </Activity>
                        </div>
                        <div>
                            <h2 className="mb-3 text-lg font-semibold text-slate-700">
                                Your Short URL
                            </h2>

                            <div className="flex flex-col gap-4  md:items-start md:justify-between">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="break-all text-blue-600 hover:cursor-pointer font-medium hover:underline"
                                >
                                    {shortUrl}
                                </a>

                                <div className="flex gap-3 flex-wrap">
                                    <button
                                        onClick={copyToClipboard}
                                        className="rounded-lg bg-slate-800 px-5 py-2 text-white transition onActiveScale hover:cursor-pointer hover:bg-slate-900"
                                    >
                                        Copy
                                    </button>

                                    <a
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-green-600 px-5 py-2 text-white transition onActiveScale hover:bg-green-700 hover:cursor-pointer"
                                    >
                                        Open
                                    </a>

                                    {/* Todo: Show Qr --------------------------------------------------------------- */}
                                    {userAuthStatus &&
                                        <button
                                            className="rounded-lg bg-cyan-600 px-5 py-2 text-white transition hover:cursor-pointer onActiveScale hover:bg-cyan-700"
                                            onClick={() => {
                                                setQrVisibility(!qrVisibility)
                                            }}>{qrVisibility ? "Hide QR" : "Get QR"}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <ToastContainer position="bottom-right" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UrlForm