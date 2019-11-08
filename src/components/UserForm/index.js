import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const UserForm = props => {
  const {
    values: { name, email, password },
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    toggle,
  } = props;

  return (
    <div>
      <DialogContent>
        <DialogContentText>
          Все поля обязательны для заполнения. Пароль должен быть не
          менее 6 символов.
        </DialogContentText>
        <form>
          <TextField
            autoComplete="off"
            name="name"
            label="Имя"
            value={name}
            helperText={
              errors.name && touched.name ? errors.name : ''
            }
            error={errors.name && touched.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            fullWidth
            type="text"
          />
          <TextField
            name="email"
            label="Email"
            value={email}
            helperText={
              errors.email && touched.email ? errors.email : ''
            }
            error={errors.email && touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            type="email"
          />
          <TextField
            autoComplete="off"
            name="password"
            label="Пароль"
            value={password}
            helperText={
              errors.password && touched.password
                ? errors.password
                : ''
            }
            error={errors.password && touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            type="text"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggle(false)} color="primary">
          Отмена
        </Button>
        <Button
          disabled={!isValid}
          onClick={handleSubmit}
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </div>
  );
};

export default UserForm;
