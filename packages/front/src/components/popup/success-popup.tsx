import * as React from 'react';
import { DialogContent, DialogOverlay, DialogProps } from '@reach/dialog';
import { css } from 'astroturf';

import { CloseButton, Img } from 'Components/atoms';

import ImgKebabSuccess from 'Img/img-kebab__success.png';

interface SuccessPopupProps extends DialogProps {
  ariaLabel: string;
}

const styles = css`
  .overlay {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    touch-action: none;
    z-index: 2;
  }

  .content {
    position: relative;
    width: auto;
    margin: auto 16px;
    padding: 0;
    border-radius: 10px;

    @media all and (min-width: 375px) {
      & {
        margin: auto;
      }
    }
  }

  .kebabImg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    object-fit: cover;
    object-position: top;
  }

  .closeButton {
    margin: 24px auto;
    background-color: var(--accent) !important;

    &:hover,
    &:focus,
    &:active {
      background-color: #F70A35 !important;
    }
  }
`;

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  children,
  onDismiss,
  isOpen,
  ariaLabel,
}) => (
  <DialogOverlay
    className={styles.overlay}
    isOpen={isOpen}
    onDismiss={onDismiss}
    dangerouslyBypassFocusLock
  >
    <DialogContent
      aria-label={ariaLabel}
      className={styles.content}
    >
      <Img
        width="230px"
        height="115px"
        className={styles.kebabImg}
        src={ImgKebabSuccess}
        alt="kebab-success"
      />
      {children}

      <CloseButton
        className={styles.closeButton}
        onClick={onDismiss}
      />
    </DialogContent>
  </DialogOverlay>
);
