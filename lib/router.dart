import 'package:buy_sell_appliction/common/widgets/bottom_bar.dart';
import 'package:buy_sell_appliction/features/admin/screens/add_product_screen.dart';
import 'package:buy_sell_appliction/features/auth/screens/auth_screen.dart';
import 'package:buy_sell_appliction/features/home/screens/category_deals_screen.dart';
import 'package:buy_sell_appliction/features/home/screens/home_screen.dart';
import 'package:flutter/material.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => AuthScreen(),
      );
    case HomeScreen.routName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => HomeScreen(),
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => BottomBar(),
      );
    case AddProdcutScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => AddProdcutScreen(),
      );
    case CategoryDealsScreen.routeName:
      var category = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => CategoryDealsScreen(
          category: category,
        ),
      );
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(child: Text('screen does not exist!')),
        ),
      );
  }
}
