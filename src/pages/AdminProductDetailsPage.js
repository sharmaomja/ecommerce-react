import AdminProductDetail from "../features/admin/components/AdminProductDetails";
import NavBar from "../features/navbar/Navbar";

function AdminProductDetailsPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductDetail></AdminProductDetail>
            </NavBar>
        </div>
     );
}

export default AdminProductDetailsPage;