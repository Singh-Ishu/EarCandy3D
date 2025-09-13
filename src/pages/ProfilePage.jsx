import "./ProfilePage.css";

export default function ProfilePage() {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        memberSince: "January 2023",
        totalOrders: 12,
        totalSpent: 2847.50
    };

    const recentOrders = [
        {
            id: "ORD-001",
            date: "2024-01-15",
            items: "Audiomaster Alpha, BassBeast X",
            total: 289.98,
            status: "Delivered"
        },
        {
            id: "ORD-002",
            date: "2024-01-08",
            items: "CrystalSound Pro",
            total: 199.99,
            status: "Delivered"
        },
        {
            id: "ORD-003",
            date: "2023-12-22",
            items: "EchoBuds 2, SoundWave Elite",
            total: 389.98,
            status: "Delivered"
        }
    ];

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <i className="material-icons">person</i>
                    </div>
                    <div className="profile-info">
                        <h1>{user.name}</h1>
                        <p className="member-since">Member since {user.memberSince}</p>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h2>Personal Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Email</label>
                                <span>{user.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Phone</label>
                                <span>{user.phone}</span>
                            </div>
                            <div className="info-item">
                                <label>Address</label>
                                <span>{user.address}</span>
                            </div>
                        </div>
                        <button className="edit-btn">Edit Information</button>
                    </div>

                    <div className="profile-section">
                        <h2>Account Summary</h2>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="summary-number">{user.totalOrders}</span>
                                <span className="summary-label">Total Orders</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-number">${user.totalSpent.toFixed(2)}</span>
                                <span className="summary-label">Total Spent</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h2>Recent Orders</h2>
                        <div className="orders-list">
                            {recentOrders.map(order => (
                                <div key={order.id} className="order-item">
                                    <div className="order-header">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">{order.date}</span>
                                    </div>
                                    <div className="order-details">
                                        <span className="order-items">{order.items}</span>
                                        <div className="order-footer">
                                            <span className="order-total">${order.total.toFixed(2)}</span>
                                            <span className={`order-status ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="view-all-btn">View All Orders</button>
                    </div>
                </div>
            </div>
        </div>
    );
}