import React from "react";
import { A, usePath } from "hookrouter";
import "./Navbar.css";

export const Navbar = () => {
	
	const path = usePath();
	let activeLink = path ? "active" : "none";

	return (
		<div className="navbar">
			<div className="navlink-holder">
				<h3>
					<A className={`navlink ${activeLink}`} href="/">
						About
					</A>
				</h3>
				<h3>
					<A className={`navlink ${activeLink}`} href="/play">
						Play
					</A>
				</h3>
				<h3>
					<A className={`navlink ${activeLink}`} href="/scores">
						Scores
					</A>
				</h3>
				<h3>
					<A className={`navlink ${activeLink}`} href="/favorites">
						Favorites
					</A>
				</h3>
			</div>
			<h1 className="title">-LYRIX-</h1>
		</div>
	);
};
