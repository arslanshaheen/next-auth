const AuthLayout = ({children}:any) => {
    return (
        <div className="flex flex-col gap-y-4">
            <nav className="bg-red-500 text-white">
                this is nav bar
            </nav>
            <h1>Auth</h1>
            {children}
        </div>
    );
};

export default AuthLayout;