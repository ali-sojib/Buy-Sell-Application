import 'dart:ui';

import 'package:buy_sell_appliction/common/widgets/stars.dart';
import 'package:buy_sell_appliction/models/product.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SearchedProduct extends StatelessWidget {
  final Product product;
  const SearchedProduct({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double avgRating = 0;
    double myRating = 0;
    double totalRating = 0;

    for (int i = 0; i < product.rating!.length; i++) {
      totalRating += product.rating![i].rating;
    }
    if (totalRating != 0) {
      avgRating = totalRating / product.rating!.length;
    }

    return Column(
      children: [
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
          color: Colors.amberAccent,
          padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
          child: Row(
            children: [
              Image.network(
                product.images[0],
                fit: BoxFit.contain,
                height: 135,
                width: 135,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Container(
                    width: 235,
                    padding: const EdgeInsets.only(left: 10, top: 5),
                    child: Text(
                      product.name,
                      style: const TextStyle(fontSize: 16),
                      maxLines: 2,
                    ),
                  ),
                  Container(
                    width: 235,
                    padding: const EdgeInsets.only(left: 10, top: 5),
                    child: Starts(rating: avgRating),
                  ),
                  Container(
                    width: 235,
                    padding: const EdgeInsets.only(left: 10, top: 5),
                    child: Text(
                      '\$ ${product.price}',
                      style: const TextStyle(fontSize: 16),
                      maxLines: 2,
                    ),
                  ),
                  Container(
                      width: 235,
                      padding: const EdgeInsets.only(
                        left: 10,
                      ),
                      child: const Text('Eligible for FREE shipping')),
                  Container(
                    width: 235,
                    padding: const EdgeInsets.only(left: 10, top: 5),
                    child: const Text(
                      'In Stock',
                      style: TextStyle(fontSize: 16, color: Colors.teal),
                      maxLines: 2,
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ],
    );
  }
}
