const UserProfilePage = ({ params }: any) => {
  return (
    <div>
      <p className="text-3xl"> Profile Page</p>
      <p> The param is {params.id}</p>
    </div>
  )
}

export default UserProfilePage;