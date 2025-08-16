
const BloodLoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-10 h-10 animate-bounce">
                <div className="absolute top-0 left-0 w-full h-full bg-red-600 rounded-full opacity-70 animate-ping"></div>
                <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BloodLoadingSpinner;