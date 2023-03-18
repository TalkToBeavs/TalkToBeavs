import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    return (
        <Routes>
            {user ? (
                children
            ) : (
                <Route path="*" element={<Navigate to="/login" />} />
            )}
        </Routes>
    )
}

export default ProtectedRoute;