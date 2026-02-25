import { motion } from "framer-motion";

const AdminFetchingBar = () => {
    return (
        <div className="relative h-1 w-full bg-[#2c2e4a] overflow-hidden mb-4 rounded">
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "linear",
                }}
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
        </div>
    );
};

export default AdminFetchingBar;