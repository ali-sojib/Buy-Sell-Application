import 'package:buy_sell_appliction/models/user.dart';

class AuthService {
  //sign up user
  void signUpUser(
      {required String eamil,
      required String password,
      required String name}) async {
    try {
      User user = User(
          id: '',
          name: name,
          password: password,
          address: '',
          type: '',
          token: '');
    } catch (e) {}
  }
}
