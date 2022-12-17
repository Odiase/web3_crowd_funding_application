# third party packages imports
from django.forms import ModelForm
from django.contrib.auth.models import User

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def clean(self):
        # data from the form is fetched using super function
        super(UserForm, self).clean()

        password = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('password2')

        if password != password2:
            self._errors['password'] = self.error_class([
                "Passwords Don't Match"])
        if len(password) < 6:
            self._errors['password'] = self.error_class([
                'Password Is Too Short'])
        

        return self.cleaned_data