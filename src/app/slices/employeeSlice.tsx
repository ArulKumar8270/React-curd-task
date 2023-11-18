import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  employeeList: any;
}

const initialState: AuthState = {
  employeeList: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmplyee: (state, action) => {
      console.log(action.payload, "payloadaddEmplyee");
      state.employeeList.push(action.payload);
    },
    updateEmployee: (state, action) => {
      state.employeeList[action.payload?.id] = action.payload;
      console.log(action.payload, "payloadupdateEmployee");
    },
    deleteEmpoyee: (state, action) => {
      state.employeeList?.splice(action.payload, 1);
      console.log(action.payload, "payloaddeleteEmpoyee");
    },
  },
});

export const { addEmplyee, updateEmployee, deleteEmpoyee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
