import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Typed useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
