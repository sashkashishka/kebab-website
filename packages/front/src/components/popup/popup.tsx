import * as React from 'react';
import { DialogContent, DialogOverlay, DialogProps } from '@reach/dialog';
import { css } from 'astroturf';
import classnames from 'classnames';

import { CloseButton } from 'Components/atoms';

interface PopupProps extends DialogProps {
  product?: boolean;
  ariaLabel: string;
}

const styles = css`
  .overlay {
    display: grid;
    grid-template-rows: 70px auto;
    justify-items: center;
    align-items: center;

    @media all and (min-width: 960px) {
      & {
        grid-template-rows: auto 70px;
        align-content: center;
      }
    }
  }

  .content {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    border-radius: 10px 10px 0 0;

    @media all and (min-width: 960px) {
      & {
        width: 60vw;
        height: 75vh;
        border-radius: 10px;
      }
    }
  }

  .content-product {
    @media all and (min-width: 960px) {
      & {
        width: 50vw;
        max-height: 560px;
      }
    }
  }

  .closeButton {
    @media all and (min-width: 960px) {
      & {
        grid-row: 2/3;
      }
    }
  }
`;

export const Popup: React.FC<PopupProps> = ({
  children,
  onDismiss,
  isOpen,
  product = false,
  ariaLabel,
}) => (
  <DialogOverlay
    className={styles.overlay}
    isOpen={isOpen}
    onDismiss={onDismiss}
  >
    <CloseButton
      className={styles.closeButton}
      onClick={onDismiss}
    />
    <DialogContent
      aria-label={ariaLabel}
      className={classnames({
        [styles.content]: true,
        [styles.contentProduct]: product,
      })}
    >
      {children}
    </DialogContent>
  </DialogOverlay>
);
