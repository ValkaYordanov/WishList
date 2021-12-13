

function Logout(props) {
    const { logout } = props;



    function onSubmit() {
        logout();
    }

    return (
        <>


            <button type="button" onClick={() => onSubmit()}>
                Logout!
            </button>
        </>
    );
}

export default Logout;
