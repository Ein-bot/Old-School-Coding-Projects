.data
    prompt:     .asciiz "How many integers will you input?\n"
    ints:        .asciiz "Please input the integer(s):\n"
    array:       .asciiz "You have entered: \n"
    sorted:     .asciiz "Here is the sorted list in ascending order: \n"
    doesNotExist: .asciiz "You entered 0 inputs.\n"
	.align 4
	x:          .space 128
    
.text
main:
    #Asks for int of input
    li $v0, 4
    la $a0, prompt
    syscall

    ##get and store int input
    li $v0, 5
    syscall
    add $t0, $v0, $zero     #$t0 holds int counter

    #checks for inputs
    #beq $t0, $zero, NONE 

    #printing out ints
    li $v0, 4
    la $a0, ints
    syscall

    #Store integer inputs for sorting
    add $t1, $zero, $zero     #counter for how many ints
    add $t2, $zero, $zero     #$t2 is index

ARRAY:
    li $v0, 5
    syscall
    add $t9, $v0, $zero
    sw $t9, x($t2)
    addi $t2, $t2, 4        #updating index
    addi $t1, $t1, 1        #updating counter
    beq $t0, $t1, ARRAY     #checking counter to see if all inputs are entered
    li $v0, 4               #print out array string
    la $a0, array
    syscall

    add $t1, $zero, $zero     #reset counter
    add $t2, $zero, $zero     #$t2 is index
uARRAY:
    lw $t3, x($t2)              #print out user inputs
    li $v0, 1                   #system knows we are printing out 1 int 
    move $a0, $t3               #moving int to $a0 for print
    syscall
    addi $t2, $t2, 4            #updating index
    addi $t1, $t1, 1            #updating counter
    beq $t0, $t1, uARRAY        #checks to see if counter reached user inputs

    addi $t1, $zero, 2          #counter for how many ints
    add $t2, $zero, $zero       #$t2 is index
    addi $t5, $zero, 4          #$t5 is index
    addi $t3, $zero, 1
    beq $t3, $t0, DONE         # makes sure it's not just one input
    addi $t6, $zero, 4          #setting up for new counter
    mul $t6, $t6, $t0           #new counter
SORT:
    lw $t3, x($t2)              #setting up to compare
    lw $t4, x($t5)              #setting up to compare
    bgt $t3, $t4, SWAP          #if bgt = true then jump to SWAP
    addi $t5, $t5, 4            #bgt = false, updating counter
    beq $t5, $t6, UPDATE        #checks to see if new counter reached end of array if so UPDATE
    j SORT                      #has not reached counter, jump to SORT

SWAP:
    sw $t3, x($t5)              #puts $t3 into greater than position
    sw $t4, x($t2)              #puts $t4 into sorting start position
    beq $t1, $t0, DONE          #if it is then it's done sorting,
    j SORT                      #returns to SORT

UPDATE:
    addi $t6, $zero, 4          #reseting counter
    mul $t6, $t6, $t0           #reseted counter
    addi $t2, $t2, 4            #updating index
    addi $t5, $t5, 4            #reseting index
    beq $t2, $t6, DONE          #if $t2 is same as $t6 that means sorting is 100% done
    j SORT                      #finished uodating, returning to SORT

DONE:
    li $v0, 4                   #prompting new string message
    la $a0, sorted              #message is "sorted"
    syscall
    add $t2, $zero, $zero       #reseting index
    add $t1, $zero, $zero       #reseting counter
DONE1:
    lw $t3, x($t2)              #loading sorted array[0]
    li $v0, 1                   #readying to print int
    move $a0, $t3               #moves sorted int into $a0 for print
    syscall
    addi $t2, $t2, 4            #updating index
    addi $t1, $t1, 1            #updating counter
    beq $t1, $t0, EXIT          #checks counter = input
    j DONE1                     #readying up next int


EXIT:
    li $v0, 10
    syscall

                                #user input was 0
NONE:
    li $v0, 4                   
    la $a0, doesNotExist
    syscall
    j EXIT