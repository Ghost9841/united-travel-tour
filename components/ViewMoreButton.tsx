'use client';

import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

type ViewMoreButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

const underline = keyframes`
  0% { width: 0; opacity: 0; }
  100% { width: 100%; opacity: 1; }
`;

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary-color, #1d4ed8) 0%, var(--orange-color, #f97316) 100%);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 18px rgba(31, 41, 55, 0.18);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(31, 41, 55, 0.26);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(125deg, rgba(255,255,255,0.15), rgba(255,255,255,0));
    transform: translateX(-110%);
    transition: transform 0.7s ease;
  }

  &:hover::before {
    transform: translateX(160%);
  }

  span {
    z-index: 1;
  }

  .stroke {
    position: absolute;
    bottom: 0.15rem;
    left: 10%;
    width: 80%;
    height: 2px;
    background: rgba(255,255,255,0.6);
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover .stroke {
    transform: scaleX(1);
    animation: ${underline} 0.35s ease forwards;
  }
`;

const ViewMoreButton = ({ href, label = 'View More', className }: ViewMoreButtonProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <StyledButton className={className}>
        <span>{label}</span>
        <span className="stroke" />
      </StyledButton>
    </Link>
  );
};

export default ViewMoreButton;
