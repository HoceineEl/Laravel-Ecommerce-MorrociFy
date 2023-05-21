<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "product_name" => fake()->sentence,
            "qty" => fake()->numberBetween($min = 1, $max = 10),
            "price" => fake()->numberBetween($min = 100, $max = 900),
            "total" => fake()->numberBetween($min = 1000, $max = 9000),
            "user_id" => fake()->numberBetween($min = 1, $max = 10)
        ];
    }
}
