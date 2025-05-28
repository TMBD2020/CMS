<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('packageId');
            $table->date('date');
            $table->string('name');
            $table->string('phone');
            $table->text('address');
            $table->string('website')->nullable();
            $table->string('startingBalance');
            $table->integer('sharePrice');
            $table->string('tradeLicenceNo');
            $table->text('logo')->nullable();
            $table->text('tradeLicencePhoto')->nullable();
            $table->boolean('status');
            $table->foreign('packageId')->references('id')
                                        ->on('packages')
                                        ->onUpdate('cascade')
                                        ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
