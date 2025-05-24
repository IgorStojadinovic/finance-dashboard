import { Pot } from "../../../lib/types/types";

export type PotItemProps = {
  pot: Pot;
};

export type PotHeaderProps = {
  pot: Pot;
};

export type PotDetailsProps = {
  pot: Pot;
};

export type PotActionsProps = {
  onAdd: () => void;
  onWithdraw: () => void;
};

