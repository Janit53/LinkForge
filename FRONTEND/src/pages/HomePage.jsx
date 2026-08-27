import { Activity, useState } from "react";
import UrlForm from "../components/UrlForm";


const HomePage = () => {

    const tabs = ["Shorten URL", "Bulk"];
    const [activeTab, setActiveTab] = useState("Shorten URL");

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-7xl rounded-3xl bg-white p-6 shadow-xl sm:p-8 lg:p-10">

                <div className="text-center">

                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                        Shorten Your URL
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Paste your URL below to generate a short, shareable link.
                    </p>

                </div>
                {
                    <nav className="flex w-full gap-1 rounded-xl bg-slate-300 shadow-inner">
                        {
                            tabs.map((tab, idx) => {
                                return (
                                    <button
                                        onClick={() => {
                                            setActiveTab(tab)
                                        }}
                                        key={idx}
                                        className={`${activeTab == tab ? "text-white bg-slate-500 shadow-sm" : "hover:bg-slate-500"} w-full rounded-lg px-4 py-2.5 text-sm font-medium
                    transition-all duration-200`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })
                        }
                    </nav>
                }

                <Activity mode={(activeTab == tabs[0]) ? "visible" : "hidden"}>
                    <UrlForm
                        customUrlVisibilityMode="visible"
                        expiryDateVisibilityMode="visible"
                    />
                </Activity>
                {/* {activeTab == tabs[0] && <UrlForm
                    customUrlVisibilityMode="visible"
                    expiryDateVisibilityMode="visible"
                />} */}

            </div>

        </div>
    );
};

export default HomePage;