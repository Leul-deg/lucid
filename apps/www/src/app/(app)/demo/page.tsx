import { Dashboard } from "@/components/dashboard";
import { generateToken } from "@/lib/generate-token";

const DemoPage = () => {
    const token = generateToken({ website: "lucid", name: "", id: "lucid" });
    return (
        <Dashboard
            website={{
                id: "lucid",
                url: "https://lucid.io",
                title: "Lucid",
                plan: "plus",
                userId: "",
                createdAt: new Date(),
                public: false,
                active: true
            }}
            showSetup={false}
            token={token}
            isPublic={false}
        />
    );
};

export default DemoPage;
