const Searchweghit = () => {
    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="search-section bg-white rounded-2xl p-6 md:p-10 -mt-28 mb-16 max-w-6xl mx-auto shadow-card relative z-30 opacity-0 translate-y-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                <div className="tabs flex justify-center gap-3 mb-8">
                    <div className="tab bg-slate-200 py-3 px-6 rounded-full cursor-pointer font-semibold transition-all duration-400 bg-linear-0 from-[var(--color-primary)] to-[var(--color-secondary)] text-white scale-105">
                        رحلات طيران</div>
                    <div className="tab bg-slate-200 py-3 px-6 rounded-full cursor-pointer font-semibold transition-all duration-400">
                        فنادق</div>
                    <div className="tab bg-slate-200 py-3 px-6 rounded-full cursor-pointer font-semibold transition-all duration-400">
                        طيران + فندق</div>
                </div>
                <form className="search-form grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    <div className="form-group relative">
                        <i className="fas fa-plane-departure form-icon absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="form-control w-full py-4 pr-12 pl-5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-400 focus:bg-white" placeholder="من" />
                    </div>
                    <div className="form-group relative">
                        <i className="fas fa-plane-arrival form-icon absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="form-control w-full py-4 pr-12 pl-5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-400 focus:bg-white" placeholder="إلى" />
                    </div>
                    <div className="form-group relative">
                        <i className="fas fa-calendar form-icon absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="form-control w-full py-4 pr-12 pl-5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-400 focus:bg-white" placeholder="تاريخ الذهاب" />
                    </div>
                    <div className="form-group relative">
                        <i className="fas fa-calendar form-icon absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="form-control w-full py-4 pr-12 pl-5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-400 focus:bg-white" placeholder="تاريخ العودة" />
                    </div>
                    <div className="form-group relative">
                        <i className="fas fa-user form-icon absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
                        <select className="form-control w-full py-4 pr-12 pl-5 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-400 focus:bg-white">
                            <option>1 مسافر</option>
                            <option>2 مسافرين</option>
                            <option>3 مسافرين</option>
                            <option>4 مسافرين</option>
                        </select>
                    </div>
                    <button className="search-btn col-span-1 md:col-span-2 lg:col-span-5 btn bg-linear-0 from-[var(--color-accent)] to-[var(--color-accent-light)] text-white py-5 rounded-xl text-xl font-bold cursor-pointer flex items-center justify-center gap-3 transition-all duration-400">
                        <i className="fas fa-search" /> ابحث عن العروض
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Searchweghit;