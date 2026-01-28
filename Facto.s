.data
    prompt:     .asciiz "Enter an integer: "
    fib:        .asciiz "The factorial of your integer is: "
    fib0:       .asciiz "The factorial of 0 is 1.\n"
    fibNeg:     .asciiz "Negative integer cannot be use. Error.\n"
    fibGreater: .asciiz "Factorial is greater than 32 bits, out of bound error.\n"
    x:          .word 12
.text
main:
    #Asks for int
    li $v0, 4
    la $a0, prompt
    syscall

    ##get and store int
    li $v0, 5
    syscall
    add $t0, $v0, $zero

    #check the int for errors
    addi $t1, $zero, 1
    bge $t0, $t1, NEXT
    beq $t0, $zero, ZERO
    la $a0, fibNeg
    li $v0, 4
    syscall
    j EXIT


#checks if user input was greater than 12 if not go ti loop.
NEXT:
    addi $t2, $zero, 1
    lw $t1, x
    bge $t1, $t0, LOOP
    la $a0, fibGreater
    li $v0, 4
    syscall
    j EXIT

#loop to start the factorial.
LOOP:
    mul $t2, $t2, $t0       #multiplies itself with user input
    addi $t0, $t0, -1       #subtracts user input by 1
    bgt $t0, $zero, LOOP    #is user input is greater than 0 then repeat loop

#prints out results of the factorial
RESULT:
    la $a0, fib
    li $v0, 4
    syscall
    li $v0, 1
    move $a0, $t2
    syscall

EXIT:
    li $v0, 10
    syscall

#user input was 0
ZERO:
    la $a0, fib0
    li $v0, 4
    syscall
    j EXIT