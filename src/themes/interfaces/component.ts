export interface Component {
  controller: {
    button: {
      gap: number;
    },
    fab: {
      height: {
        sm: number,
        md: number,
        lg: number,
      }
    }
  },
  input: {
    height: number;
    helperText: {
      mx: number;
      mt: number;
      letterSpacing: number;
    }
  },
  navbar: {
    icon: number;
  }
}
