import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div className="navbar-wrapper">
			<div className="navbar-wrapper--grid container">
				<div className="navbar-wrapper--logo">
					<img src="https://via.placeholder.com/150" alt="foxbook-logo" />
					<div className="navbar-wrapper--logo--srch">
						<input type="text" placeholder="Search..." />
					</div>

				</div>
				<div className="navbar-wrapper--links">
					<Link to="/">Home</Link>
					<div className="navbar-wrapper--links--dropdown">
						<i className="fas fa-user-friends"><span>10</span></i>
						<div className="navbar-wrapper--links--dropdown--content">

						</div>
					</div>
					<div className="navbar-wrapper--links--dropdown">
						<i className="fas fa-envelope-square"><span>1</span></i>
						<div className="navbar-wrapper--links--dropdown--content">

						</div>
					</div>
					<div className="navbar-wrapper--links--dropdown">
						<i className="fas fa-bell"><span>1</span></i>
						<div className="navbar-wrapper--links--dropdown--content">

						</div>
					</div>




				</div>
			</div>
		</div>
	)
}
