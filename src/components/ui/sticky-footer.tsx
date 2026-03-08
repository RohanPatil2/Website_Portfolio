import React from 'react';
import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
	GithubIcon,
	LinkedinIcon,
	MailIcon,
	TerminalIcon,
	TwitterIcon,
} from 'lucide-react';
import { Button } from './button';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative w-full', className)}
			style={{ 
				clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
				height: 'var(--footer-height)',
				'--footer-height': '800px'
			} as React.CSSProperties}
			{...props}
		>
			<style>{`
				@media (min-width: 768px) {
					footer { --footer-height: 500px !important; }
				}
			`}</style>
			<div className="fixed bottom-0 w-full bg-[#050505]" style={{ height: 'var(--footer-height)' }}>
				<div className="sticky h-full overflow-y-auto" style={{ top: 'calc(100vh - var(--footer-height))' }}>
					<div className="relative flex size-full flex-col justify-between gap-5 border-t border-white/10 px-4 py-8 md:px-12">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,240,255,0.06)_0,rgba(255,255,255,0.02)_50%,rgba(0,240,255,0.01)_80%)] absolute top-0 left-0 h-[320px] w-[140px] -translate-y-[87.5px] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,240,255,0.04)_0,rgba(0,240,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[320px] w-[60px] translate-x-[5%] -translate-y-1/2 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,240,255,0.04)_0,rgba(0,240,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-[320px] w-[60px] -translate-y-[87.5px] -rotate-45 rounded-full" />
						</div>
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0 z-10">
							<AnimatedContainer className="w-full max-w-sm min-w-[200px] space-y-4">
								<TerminalIcon className="size-8 text-cyan-400" />
								<p className="text-white/60 mt-8 text-sm md:mt-0 font-mono">
									Architecting Reliable RAG Pipelines & AI Agents. Bridging the gap between theoretical models and reliable, real-world deployment.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<Button key={link.title} size="icon" variant="outline" className="size-8" asChild>
											<a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
												<link.icon className="size-4" />
											</a>
										</Button>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm uppercase font-bold text-cyan-400 tracking-widest">{group.label}</h3>
										<ul className="text-white/60 mt-4 space-y-2 text-sm md:text-xs lg:text-sm font-mono">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-white inline-flex items-center transition-all duration-300"
													>
														{link.icon && <link.icon className="me-1 size-4" />}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-white/40 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-sm md:flex-row z-10 font-mono">
							<p>© {new Date().getFullYear()} Rohan Upendra Patil. All rights reserved.</p>
							<p>Binghamton, NY</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/rohanpatil7979', icon: LinkedinIcon },
	{ title: 'Github', href: 'https://github.com', icon: GithubIcon },
	{ title: 'Email', href: 'mailto:rpatil4@binghamton.edu', icon: MailIcon },
	{ title: 'Twitter', href: '#', icon: TwitterIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Navigation',
		links: [
			{ title: 'Experience', href: '#experience' },
			{ title: 'Projects', href: '#projects' },
			{ title: 'Skills', href: '#skills' },
			{ title: 'Credentials', href: '#credentials' },
			{ title: 'Ledger', href: '#ledger' },
		],
	},
	{
		label: 'Specialties',
		links: [
			{ title: 'Agentic RAG Systems', href: '#' },
			{ title: 'Reinforcement Learning', href: '#' },
			{ title: 'MLOps Pipelines', href: '#' },
			{ title: 'Bias Detection in LLMs', href: '#' },
			{ title: 'Autonomous Systems', href: '#' },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/rohanpatil7979' },
			{ title: 'GitHub', href: 'https://github.com' },
			{ title: 'Email', href: 'mailto:rpatil4@binghamton.edu' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
