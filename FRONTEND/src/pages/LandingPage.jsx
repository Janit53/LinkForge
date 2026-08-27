import UrlForm from "../components/UrlForm";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">

                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold shadow-lg shadow-blue-500/20">
                        S
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Shortify
                    </span>
                </div>

                <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                    <a
                        href="#features"
                        className="transition hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="transition hover:text-white"
                    >
                        How it works
                    </a>

                    <a
                        href="/login"
                        className="rounded-lg border border-slate-700 px-4 py-2 transition hover:border-slate-500 hover:bg-slate-900"
                    >
                        Login
                    </a>

                    <a
                        href="/signup"
                        className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-200"
                    >
                        Get Started
                    </a>
                </div>

            </nav>


            {/* Hero */}
            <main className="relative z-10">

                <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-24">

                    <div className="mx-auto max-w-4xl text-center">

                        {/* Badge */}
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                            Simple. Fast. Powerful.
                        </div>


                        {/* Heading */}
                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">

                            Short links.
                            <br />

                            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                Big possibilities.
                            </span>

                        </h1>


                        {/* Description */}
                        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                            Turn long, complicated URLs into short, clean and
                            shareable links in seconds.
                        </p>

                    </div>


                    {/* URL Form Card */}
                    <div className="mx-auto mt-14 max-w-3xl">

                        <div className="relative">

                            {/* Glow */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 opacity-20 blur-xl" />

                            <div className="relative rounded-3xl border border-slate-200/10 bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">

                                <div className="mb-6">

                                    <h2 className="text-2xl font-bold text-slate-800">
                                        Shorten your URL
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Paste your URL and get a short link instantly.
                                    </p>

                                </div>

                                <UrlForm
                                    customUrlVisibilityMode="hidden"
                                    expiryDateVisibilityMode="hidden"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Trust text */}
                    <div className="mt-10 text-center">

                        <p className="text-sm text-slate-500">
                            No complicated setup. Just paste, shorten and share.
                        </p>

                    </div>

                </section>


                {/* Features */}
                <section
                    id="features"
                    className="border-t border-white/5 bg-slate-900/50"
                >

                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                                Why Shortify?
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything you need for better links
                            </h2>

                            <p className="mt-4 text-slate-400">
                                Simple tools that make sharing links faster,
                                cleaner and more convenient.
                            </p>

                        </div>


                        <div className="mt-14 grid gap-6 md:grid-cols-3">

                            {/* Feature 1 */}
                            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                                    ⚡
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Lightning Fast
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    Generate short URLs quickly without unnecessary
                                    steps or complicated configuration.
                                </p>

                            </div>


                            {/* Feature 2 */}
                            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.05]">

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                                    🔒
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Secure Links
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    Your links are generated and managed with
                                    security and reliability in mind.
                                </p>

                            </div>


                            {/* Feature 3 */}
                            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.05]">

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                                    📊
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Easy Management
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    Keep your shortened URLs organized and
                                    manage them easily from your account.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* How it works */}
                <section
                    id="how-it-works"
                    className="border-t border-white/5"
                >

                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                                How it works
                            </p>

                            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Three steps. That's it.
                            </h2>

                        </div>


                        <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-3">

                            <div className="text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-xl font-bold text-blue-400">
                                    1
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Paste your URL
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Enter the long URL you want to shorten.
                                </p>

                            </div>


                            <div className="text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-xl font-bold text-violet-400">
                                    2
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Generate
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Click the button and we'll create your short link.
                                </p>

                            </div>


                            <div className="text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-xl font-bold text-cyan-400">
                                    3
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Share it
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Copy your new URL and share it anywhere.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* CTA */}
                <section className="border-t border-white/5 bg-slate-900/50">

                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Ready to shorten your first link?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Make your URLs shorter, cleaner and easier to share.
                        </p>

                        <a
                            href="#top"
                            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                        >
                            Shorten a URL
                        </a>

                    </div>

                </section>

            </main>


            {/* Footer */}
            <footer className="border-t border-white/5">

                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">

                    <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
                            S
                        </div>

                        <span>
                            Shortify
                        </span>

                    </div>

                    <p>
                        © 2026 Shortify. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default LandingPage;