import type { SVGProps } from "react"

export function WorkspaceBriefIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<path d="M4 20V10" />
			<path d="M10 20V4" />
			<path d="M16 20v-6" />
			<path d="M22 20v-9" />
		</svg>
	)
}

export function WorkspaceServicesIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<path d="M8 3h8l1 4-5 5-5-5 1-4Z" />
			<path d="M12 12v9" />
			<path d="M8 17h8" />
		</svg>
	)
}

export function WorkspaceMessagesIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m6 9 6 4 6-4" />
		</svg>
	)
}

export function WorkspacePaymentsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<rect x="3" y="6" width="18" height="12" rx="2" />
			<path d="M3 11h18" />
			<path d="M7 15h3" />
		</svg>
	)
}

export function MenuCloseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" fill="none" aria-hidden="true" {...props}>
			<line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
			<line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
		</svg>
	)
}

export function MenuHamburgerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" fill="none" aria-hidden="true" {...props}>
			<line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
			<line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
			<line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
		</svg>
	)
}

export function ErrorAlertIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
			<path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			<circle cx="8" cy="11" r="0.75" fill="currentColor" />
		</svg>
	)
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 18 18" fill="none" {...props}>
			<path d="M1.5 9C3 6.5 5.7 4 9 4s6 2.5 7.5 5c-1.5 2.5-4.2 5-7.5 5S3 11.5 1.5 9z" stroke="currentColor" strokeWidth="1.4" />
			<circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" />
		</svg>
	)
}

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 18 18" fill="none" {...props}>
			<path d="M2 2l14 14M7.5 7.55A2 2 0 0110.45 10.5M5.3 5.32C3.68 6.3 2.4 7.8 1.5 9c1.5 2.5 4.2 5 7.5 5a7.3 7.3 0 003.7-1.02M12.7 12.68C14.32 11.7 15.6 10.2 16.5 9 15 6.5 12.3 4 9 4a7.3 7.3 0 00-3.7 1.02" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
		</svg>
	)
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	)
}
