interface CustomButtonProps {
    link: string,
    text: string
}

const CustomButton = ({link, text} : CustomButtonProps) => {
    return (
        <a href={link}>
            <button
                type="button"
                className="font-pop text-lg text-white bg-slate-800 border-2 dark:border-none hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-8 py-3.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 uppercase duration-700"
            >
                {text}
            </button>
        </a>
    )
}

export default CustomButton