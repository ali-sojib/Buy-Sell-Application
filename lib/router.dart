import 'package:buy_sell_appliction/common/widgets/bottom_bar.dart';
import 'package:buy_sell_appliction/features/admin/screens/add_product_screen.dart';
import 'package:buy_sell_appliction/features/auth/screens/auth_screen.dart';
import 'package:buy_sell_appliction/features/home/screens/category_deals_screen.dart';
import 'package:buy_sell_appliction/features/home/screens/home_screen.dart';
import 'package:buy_sell_appliction/features/product_detail/screens/product_detail_screen.dart';
import 'package:buy_sell_appliction/features/search/screens/search_screen.dart';
import 'package:buy_sell_appliction/models/product.dart';
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
    case SearchScreen.routeName:
      var searchQuery = routeSettings.arguments as String;
      return MaterialPageRoute(
        builder: (_) => SearchScreen(
          searchQuery: searchQuery,
        ),
      );
    case ProductDetailScreen.routeName:
      var product = routeSettings.arguments as Product;
      return MaterialPageRoute(
        builder: (_) => ProductDetailScreen(
          product: product,
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
