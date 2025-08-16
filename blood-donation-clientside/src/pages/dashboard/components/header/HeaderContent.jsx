const HeaderContent = ({ redText, blackText }) => {
    return (
        <div className="mb-8 pb-6 border-b-2 border-red-100">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                <span className="text-red-600">{redText}</span> {blackText}
            </h2>
        </div>
    );
};

export default HeaderContent;