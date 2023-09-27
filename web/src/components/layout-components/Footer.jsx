import React from 'react'
import { APP_NAME } from '@configs/AppConfig';


export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> All rights reserved.</span>
			<div>
			<span>Design and Developed by {" "}</span><a className="text-primary" href="/#" onClick={e => e.preventDefault()}>Infikey Technologies Pvt Ltd.</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a>
			</div>
		</footer>
	)
}

