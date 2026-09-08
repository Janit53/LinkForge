import { useEffect, useState } from "react";
import { deleteShortUrlApi, getShortUrlsOfUserApi } from "../apis/shortUrl.api";
import { useSelector } from "react-redux";
import { dotEnvConfig } from "../config/conf";
import { ToastContainer, toast } from 'react-toastify';
import "../index.css";

const UserUrls = () => {
    const [urls, setUrls] = useState([])
    const userInfo = useSelector((state) => state.user.userData)
    const userId = userInfo?._id;
    const backendDomain = dotEnvConfig.domainUrl;


    useEffect(() => {

        if (!userId) return;

        const data = getShortUrlsOfUserApi(userId);
        data.then((data) => {
            setUrls(data);
        }).catch((err) => {
            console.log("UserUrls COMPONENT ::", err.message)
        })

    }, [userId])

    const copyToClipboard = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        toast("Copied!", {
            autoClose: 500
        });
    }

    const deleteShortUrl = async (shortUrl) => {

        if (await deleteShortUrlApi(shortUrl)) {
            const filteredUrls = urls.filter((url) => url.shortUrl != shortUrl)
            setUrls(filteredUrls);
        }
        else {
            console.log("Could'nt Delete it, try again...")
        }
    }

    return (
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Your URLs
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Manage and track your shortened URLs.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-100">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Original URL
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Short URL
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Clicks
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                        {urls?.map((url) => (
                            <tr
                                key={url.shortUrl}
                                className="group transition-colors hover:bg-slate-50"
                            >
                                {/* Original URL */}
                                <td className="max-w-xs px-6 py-5">
                                    <a
                                        href={url.originalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block truncate text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 hover:underline"
                                        title={url.originalUrl}
                                    >
                                        {url.originalUrl}
                                    </a>
                                </td>

                                {/* Short URL */}
                                <td className="max-w-xs px-6 py-5">
                                    <a
                                        href={`${backendDomain}/${url.shortUrl}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block truncate text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                                        title={`${backendDomain}/${url.shortUrl}`}
                                    >
                                        {backendDomain}/{url.shortUrl}
                                    </a >
                                </td >

                                {/* Clicks */}
                                < td className="px-6 py-5 text-center" >
                                    <span className="inline-flex min-w-12 items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                        {url.clicks}
                                    </span>
                                </td >

                                {/* Actions */}
                                < td className="px-6 py-5 text-center flex gap-2 justify-between" >
                                    <button
                                        onClick={() => copyToClipboard(`${backendDomain}/${url.shortUrl}`)}
                                        className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:cursor-pointer hover:bg-green-700 hover:shadow-md active:scale-95"
                                    >
                                        Copy
                                    </button>

                                    <button
                                        onClick={() => deleteShortUrl(url.shortUrl)}
                                        className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:cursor-pointer hover:bg-red-700 hover:shadow-md active:scale-95">
                                        Delete
                                    </button>
                                </td >
                            </tr >
                        ))}
                    </tbody >
                </table >
            </div >

            {
                urls?.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-sm font-medium text-slate-600">
                            No shortened URLs yet.
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                            Create your first shortened URL to see it here.
                        </p>
                    </div>
                )
            }

            < ToastContainer position="bottom-right" />
        </div >


        // <div className="shadow-slate-900 p-2 rounded-2xl bg-slate-300 shadow-2xl mt-10">
        //     <table className=" w-full mt-10 rounded-2xl">
        //         <thead className="bg-slate-300">
        //             <tr className="bg-slate-300 user-analytics-row-css rounded-2xl">
        //                 <th>Original URL</th>
        //                 <th>Short URL</th>
        //                 <th>Clicks</th>
        //                 <th>Actions</th>
        //             </tr>
        //         </thead>

        //         <tbody className="bg-white">
        //             {urls.map((url) => {
        //                 return (
        //                     <tr className="user-analytics-row-css rounded-2xl" key={url.shortUrl}>
        //                         <th><a className="underline text-blue-500" href={url.originalUrl}>{url.originalUrl}</a></th>
        //                         <th> <a className="underline text-blue-500" href={`${ backendDomain } /${url.shortUrl}`}>{`${backendDomain}/${ url.shortUrl } `}</a> </th>
        //                         <th>{url.clicks}</th>
        //                         <th>
        //                             <button
        //                                 onClick={copyToClipboard}
        //                                 className="rounded-lg bg-green-600 px-5 py-2 text-white transition onActiveScale hover:cursor-pointer hover:bg-green-700"
        //                             >
        //                                 Copy
        //                             </button>
        //                         </th>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>
        //     </table>
        //     <ToastContainer position="bottom-right" />
        // </div>
    )
}

export { UserUrls };
