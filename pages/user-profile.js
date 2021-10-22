const UserProfilePage = (props) => {
    return <h1>{props.username}</h1>;
};

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: 'max',
        },
    };
}

export default UserProfilePage;
