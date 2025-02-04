import React, { useState } from 'react';
import useNuiEvent from '../../hooks/useNuiEvent';
import InventoryControl from './InventoryControl';
import InventoryHotbar from './InventoryHotbar';
import { useAppDispatch } from '../../store';
import { refreshSlots, setAdditionalMetadata, setupInventory } from '../../store/inventory';
import { useExitListener } from '../../hooks/useExitListener';
import type { Inventory as InventoryProps } from '../../typings';
import RightInventory from './RightInventory';
import LeftInventory from './LeftInventory';
import Tooltip from '../utils/Tooltip';
import { closeTooltip } from '../../store/tooltip';
import InventoryContext from './InventoryContext';
import { closeContextMenu } from '../../store/contextMenu';
import Fade from '../utils/transitions/Fade';
import { FaShirt, FaMaskFace, FaVest, FaGlasses } from 'react-icons/fa6';
import { PiPants } from 'react-icons/pi';
import { FaHatCowboy } from 'react-icons/fa';
import { GiConverseShoe, GiGymBag } from 'react-icons/gi';
import { BsWatch } from 'react-icons/bs';
import { onClothing } from '../../dnd/onClothing';
import BodyDamage from './BodyDamage';

const Inventory: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const dispatch = useAppDispatch();

  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    dispatch(closeContextMenu());
    dispatch(closeTooltip());
  });
  useExitListener(setInventoryVisible);

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventory(data));
    !inventoryVisible && setInventoryVisible(true);
  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  useNuiEvent('displayMetadata', (data: Array<{ metadata: string; value: string }>) => {
    dispatch(setAdditionalMetadata(data));
  });

  const handleClothingClick = (type: string) => {
    onClothing(type);
  };

  return (
    <>
      <Fade in={inventoryVisible}>
        <div className="inventory-wrapper-logo-parent">
          <div className="inventory-wrapper">
            <div className="inventory-wrapper-parent-end">
              <div style={{ width: '180px' }}>
                <div
                  style={{
                    backgroundColor: `rgba(29, 35, 39, 0.77)`,
                    padding: '14px',
                    borderRadius: '2px',
                    marginBottom: 10,
                  }}
                >
                  <InventoryControl />
                </div>
                <div style={{ backgroundColor: `rgba(29, 35, 39, 0.77)`, padding: '14px', borderRadius: '2px' }}>
                  <div className="inventory-control">
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('shirt')}>
                      <FaShirt size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('hat')}>
                      <FaHatCowboy size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('mask')}>
                      <FaMaskFace size="2em" />
                    </button>
                  </div>
                  <div className="inventory-control">
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('vest')}>
                      <FaVest size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('glasses')}>
                      <FaGlasses size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('watch')}>
                      <BsWatch size="2em" />
                    </button>
                  </div>
                  <div className="inventory-control">
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('bag')}>
                      <GiGymBag size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('pants')}>
                      <PiPants size="2em" />
                    </button>
                    <button className="inventory-control-button-ext" onClick={() => handleClothingClick('shoes')}>
                      <GiConverseShoe size="2em" />
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: `rgba(29, 35, 39, 0.77)`, padding: '14px', borderRadius: '2px' }}>
                <LeftInventory />
              </div>
            </div>
            <div className="inventory-wrapper-parent-start">
              <div style={{ width: '180px' }}>
                <BodyDamage />
              </div>
              <div style={{ backgroundColor: `rgba(29, 35, 39, 0.77)`, padding: '14px', borderRadius: '2px' }}>
                <RightInventory />
              </div>
            </div>
            <Tooltip />
            <InventoryContext />
          </div>
          {/* </div> */}
        </div>
      </Fade>
      <InventoryHotbar />
    </>
  );
};

export default Inventory;
