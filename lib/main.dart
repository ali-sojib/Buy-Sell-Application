import 'package:buy_sell_appliction/common/widgets/bottom_bar.dart';
import 'package:buy_sell_appliction/constants/global_variable.dart';
import 'package:buy_sell_appliction/features/admin/screens/admin_screen.dart';
import 'package:buy_sell_appliction/features/auth/screens/auth_screen.dart';
import 'package:buy_sell_appliction/features/auth/services/auth_service.dart';
import 'package:buy_sell_appliction/router.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => UserProvider(),
        ),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();

  @override
  void initState() {
    super.initState();
    authService.getUserData(context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Buy sell Application',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: const ColorScheme.light(
          primary: GlobalVariables.secondaryColor,
        ),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          iconTheme: IconThemeData(color: Colors.black),
        ),
      ),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: Provider.of<UserProvider>(context).user.token.isNotEmpty
          ? Provider.of<UserProvider>(context).user.type == 'user'
              /*i understand *IMPORTENT*
              isNotEmpty=> if (true) ? fist : second
                        ans:- ...{if true go second/ false go first}
                        type=> if if (true) ? fist : second
                            ans:- ...{if true go second/ false go first}
              */
              ? const BottomBar()
              : const AdminScreen()
          : const AuthScreen(),
    );
  }
}
