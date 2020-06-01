import React from "react";
import { A, usePath } from "hookrouter";
import "./Navbar.css";

export const Navbar = () => {
	const path = usePath();

	return (
		<div className="navbar">
			<div className="navlink-holder">
				<h3>
					<A className={path === "/" ? "navlink-active" : "navlink"} href="/">
						About
					</A>
				</h3>
				<h3>
					<A
						className={path === "/play" ? "navlink-active" : "navlink"}
						href="/play">
						Play
					</A>
				</h3>
				<h3>
					<A
						className={path === "/scores" ? "navlink-active" : "navlink"}
						href="/scores">
						Scores
					</A>
				</h3>
				<h3>
					<A
						className={path === "/favorites" ? "navlink-active" : "navlink"}
						href="/favorites">
						Favorites
					</A>
				</h3>
			</div>
			<h1 className="title">-LYRIX-</h1>
		</div>
	);
};
