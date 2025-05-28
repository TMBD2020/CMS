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
        Schema::create('patners', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('companyId');
            $table->date('jDate');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            $table->string('designation')->nullable();
            $table->string('gender');
            $table->string('bGroup');
            $table->string('fName');
            $table->string('mName');
            $table->integer('totalShare');
            $table->string('nidNo');
            $table->text('photo');
            $table->text('nidPhoto');
            $table->string('nName');
            $table->string('relationWithNominee');
            $table->text('nPhoto');
            $table->text('nNidPhoto');
            $table->text('mManualFormPhoto');
            $table->integer('status');
            $table->integer('createdBy')->nullable();
            $table->integer('updatedBy')->nullable();
            $table->foreign('companyId')->references('id')
            ->on('companies')
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
        Schema::dropIfExists('patners');
    }
};
